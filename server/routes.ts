import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { WebSocketServer, WebSocket } from "ws";
import { insertHelpTopicSchema, insertBasicsInstructionSchema, insertWebsiteSchema, insertFeedbackSchema, insertNotificationSchema, insertChatMessageSchema } from "@shared/schema";
import session from "express-session";
import { randomUUID } from "crypto";

const ADMIN_PASSWORD = "BusinessDawg2025SyncHQ💎";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || randomUUID(),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Admin authentication middleware
  const requireAdmin = (req: any, res: any, next: any) => {
    if (!req.session.isAdmin) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };

  // Admin login
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      req.session.isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  // Check admin status
  app.get("/api/admin/status", (req, res) => {
    res.json({ isAuthenticated: !!req.session.isAdmin });
  });

  // Help Topics
  app.get("/api/help-topics", async (req, res) => {
    const topics = await storage.getAllHelpTopics();
    res.json(topics);
  });

  app.get("/api/help-topics/:id", async (req, res) => {
    const topic = await storage.getHelpTopic(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }
    res.json(topic);
  });

  app.post("/api/help-topics", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertHelpTopicSchema.parse(req.body);
      const topic = await storage.createHelpTopic(validatedData);
      res.json(topic);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/help-topics/:id", requireAdmin, async (req, res) => {
    const success = await storage.deleteHelpTopic(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Topic not found" });
    }
    res.json({ success: true });
  });

  // Basics Instructions
  app.get("/api/basics", async (req, res) => {
    const instructions = await storage.getAllBasicsInstructions();
    res.json(instructions);
  });

  app.get("/api/basics/:id", async (req, res) => {
    const instruction = await storage.getBasicsInstruction(req.params.id);
    if (!instruction) {
      return res.status(404).json({ error: "Instruction not found" });
    }
    res.json(instruction);
  });

  app.post("/api/basics", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBasicsInstructionSchema.parse(req.body);
      const instruction = await storage.createBasicsInstruction(validatedData);
      res.json(instruction);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/basics/:id", requireAdmin, async (req, res) => {
    const success = await storage.deleteBasicsInstruction(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Instruction not found" });
    }
    res.json({ success: true });
  });

  // Websites
  app.get("/api/websites", async (req, res) => {
    const websites = await storage.getAllWebsites();
    res.json(websites);
  });

  app.get("/api/websites/:id", async (req, res) => {
    const website = await storage.getWebsite(req.params.id);
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }
    res.json(website);
  });

  app.post("/api/websites", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertWebsiteSchema.parse(req.body);
      const website = await storage.createWebsite(validatedData);
      res.json(website);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/websites/:id", requireAdmin, async (req, res) => {
    const success = await storage.deleteWebsite(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Website not found" });
    }
    res.json({ success: true });
  });

  // Feedback
  app.get("/api/feedback", requireAdmin, async (req, res) => {
    const feedback = await storage.getAllFeedback();
    res.json(feedback);
  });

  app.post("/api/feedback", async (req, res) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(validatedData);
      res.json(feedback);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  // Notifications
  app.get("/api/notifications", async (req, res) => {
    const notifications = await storage.getAllNotifications();
    res.json(notifications);
  });

  app.post("/api/notifications", requireAdmin, async (req, res) => {
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

  app.patch("/api/notifications/:id/read", async (req, res) => {
    const success = await storage.markNotificationAsRead(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json({ success: true });
  });

  // Chat Messages
  app.get("/api/chat-messages", async (req, res) => {
    const messages = await storage.getAllChatMessages();
    res.json(messages);
  });

  app.post("/api/chat-messages", async (req, res) => {
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
