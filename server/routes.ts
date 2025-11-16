import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { WebSocketServer, WebSocket } from "ws";
import { insertHelpTopicSchema, insertBasicsInstructionSchema, insertWebsiteSchema, insertFeedbackSchema, insertNotificationSchema, insertChatMessageSchema } from "@shared/schema";
import session from "express-session";
import crypto from "crypto";

// Load admin password from environment variable
// In production, this should be a hashed password stored securely
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || 
  crypto.createHash('sha256').update('BusinessDawg2025SyncHQ💎').digest('hex');

// Rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number } {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);
  
  if (!attempt) {
    return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS - 1 };
  }
  
  // Reset if lockout period has passed
  if (now - attempt.lastAttempt > LOCKOUT_DURATION) {
    loginAttempts.delete(ip);
    return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS - 1 };
  }
  
  if (attempt.count >= MAX_LOGIN_ATTEMPTS) {
    return { allowed: false, remainingAttempts: 0 };
  }
  
  return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS - attempt.count - 1 };
}

function recordLoginAttempt(ip: string, success: boolean) {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);
  
  if (success) {
    loginAttempts.delete(ip);
    return;
  }
  
  if (!attempt) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
  } else {
    attempt.count += 1;
    attempt.lastAttempt = now;
  }
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware with secure configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'strict',
      },
    })
  );

  // Admin authentication middleware
  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!(req.session as any).isAdmin) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };

  // Admin login with rate limiting
  app.post("/api/admin/login", (req: Request, res: Response) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const { password } = req.body;
    
    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return res.status(429).json({ 
        error: "Too many login attempts. Please try again later.",
        lockoutDuration: LOCKOUT_DURATION / 1000 / 60,
      });
    }
    
    // Hash the provided password and compare
    const passwordHash = hashPassword(password);
    
    if (passwordHash === ADMIN_PASSWORD_HASH) {
      (req.session as any).isAdmin = true;
      recordLoginAttempt(ip, true);
      res.json({ success: true });
    } else {
      recordLoginAttempt(ip, false);
      res.status(401).json({ 
        error: "Invalid password",
        remainingAttempts: rateLimit.remainingAttempts,
      });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  // Check admin status
  app.get("/api/admin/status", (req: Request, res: Response) => {
    res.json({ isAuthenticated: !!(req.session as any).isAdmin });
  });

  // Help Topics
  app.get("/api/help-topics", async (req: Request, res: Response) => {
    const topics = await storage.getAllHelpTopics();
    res.json(topics);
  });

  app.get("/api/help-topics/:id", async (req: Request, res: Response) => {
    const topic = await storage.getHelpTopic(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }
    res.json(topic);
  });

  app.post("/api/help-topics", requireAdmin, async (req: Request, res: Response) => {
    try {
      const validatedData = insertHelpTopicSchema.parse(req.body);
      const topic = await storage.createHelpTopic(validatedData);
      res.json(topic);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/help-topics/:id", requireAdmin, async (req: Request, res: Response) => {
    const success = await storage.deleteHelpTopic(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Topic not found" });
    }
    res.json({ success: true });
  });

  // Basics Instructions
  app.get("/api/basics", async (req: Request, res: Response) => {
    const instructions = await storage.getAllBasicsInstructions();
    res.json(instructions);
  });

  app.get("/api/basics/:id", async (req: Request, res: Response) => {
    const instruction = await storage.getBasicsInstruction(req.params.id);
    if (!instruction) {
      return res.status(404).json({ error: "Instruction not found" });
    }
    res.json(instruction);
  });

  app.post("/api/basics", requireAdmin, async (req: Request, res: Response) => {
    try {
      const validatedData = insertBasicsInstructionSchema.parse(req.body);
      const instruction = await storage.createBasicsInstruction(validatedData);
      res.json(instruction);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/basics/:id", requireAdmin, async (req: Request, res: Response) => {
    const success = await storage.deleteBasicsInstruction(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Instruction not found" });
    }
    res.json({ success: true });
  });

  // Websites
  app.get("/api/websites", async (req: Request, res: Response) => {
    const websites = await storage.getAllWebsites();
    res.json(websites);
  });

  app.get("/api/websites/:id", async (req: Request, res: Response) => {
    const website = await storage.getWebsite(req.params.id);
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }
    res.json(website);
  });

  app.post("/api/websites", requireAdmin, async (req: Request, res: Response) => {
    try {
      const validatedData = insertWebsiteSchema.parse(req.body);
      const website = await storage.createWebsite(validatedData);
      res.json(website);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/websites/:id", requireAdmin, async (req: Request, res: Response) => {
    const success = await storage.deleteWebsite(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Website not found" });
    }
    res.json({ success: true });
  });

  // Feedback
  app.get("/api/feedback", requireAdmin, async (req: Request, res: Response) => {
    const feedback = await storage.getAllFeedback();
    res.json(feedback);
  });

  app.post("/api/feedback", async (req: Request, res: Response) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(validatedData);
      res.json(feedback);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  // Notifications
  app.get("/api/notifications", async (req: Request, res: Response) => {
    const notifications = await storage.getAllNotifications();
    res.json(notifications);
  });

  app.post("/api/notifications", requireAdmin, async (req: Request, res: Response) => {
    try {
      const validatedData = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(validatedData);
      
      // Broadcast to all connected WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "notification", data: notification }));
        }
      });
      
      res.json(notification);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/notifications/:id/read", async (req: Request, res: Response) => {
    const success = await storage.markNotificationAsRead(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json({ success: true });
  });

  // Chat Messages
  app.get("/api/chat-messages", async (req: Request, res: Response) => {
    const messages = await storage.getAllChatMessages();
    res.json(messages);
  });

  app.post("/api/chat-messages", async (req: Request, res: Response) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      
      // Broadcast to all connected WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "chat", data: message }));
        }
      });
      
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  const httpServer = createServer(app);
  
  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  wss.on("connection", (ws) => {
    console.log("WebSocket client connected");

    ws.on("message", (message) => {
      console.log("Received message:", message.toString());
    });

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });

  return httpServer;
}
