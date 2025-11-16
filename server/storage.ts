import {
  type HelpTopic, type InsertHelpTopic,
  type BasicsInstruction, type InsertBasicsInstruction,
  type Website, type InsertWebsite,
  type Feedback, type InsertFeedback,
  type Notification, type InsertNotification,
  type ChatMessage, type InsertChatMessage,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const HELP_TOPICS_FILE = join(DATA_DIR, "help-topics.json");
const BASICS_FILE = join(DATA_DIR, "basics.json");
const WEBSITES_FILE = join(DATA_DIR, "websites.json");
const FEEDBACK_FILE = join(DATA_DIR, "feedback.json");
const NOTIFICATIONS_FILE = join(DATA_DIR, "notifications.json");
const CHAT_MESSAGES_FILE = join(DATA_DIR, "chat-messages.json");

// Ensure data directory exists
import { mkdirSync } from "fs";
try {
  mkdirSync(DATA_DIR, { recursive: true });
} catch (e) {}

export interface IStorage {
  // Help Topics
  getAllHelpTopics(): Promise<HelpTopic[]>;
  getHelpTopic(id: string): Promise<HelpTopic | undefined>;
  createHelpTopic(topic: InsertHelpTopic): Promise<HelpTopic>;
  deleteHelpTopic(id: string): Promise<boolean>;

  // Basics Instructions
  getAllBasicsInstructions(): Promise<BasicsInstruction[]>;
  getBasicsInstruction(id: string): Promise<BasicsInstruction | undefined>;
  createBasicsInstruction(instruction: InsertBasicsInstruction): Promise<BasicsInstruction>;
  deleteBasicsInstruction(id: string): Promise<boolean>;

  // Websites
  getAllWebsites(): Promise<Website[]>;
  getWebsite(id: string): Promise<Website | undefined>;
  createWebsite(website: InsertWebsite): Promise<Website>;
  deleteWebsite(id: string): Promise<boolean>;

  // Feedback
  getAllFeedback(): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;

  // Notifications
  getAllNotifications(): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<boolean>;

  // Chat Messages
  getAllChatMessages(): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private helpTopics: Map<string, HelpTopic>;
  private basicsInstructions: Map<string, BasicsInstruction>;
  private websites: Map<string, Website>;
  private feedback: Map<string, Feedback>;
  private notifications: Map<string, Notification>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.helpTopics = new Map();
    this.basicsInstructions = new Map();
    this.websites = new Map();
    this.feedback = new Map();
    this.notifications = new Map();
    this.chatMessages = new Map();

    this.loadData();
  }

  private loadData() {
    // Load help topics
    if (existsSync(HELP_TOPICS_FILE)) {
      const data = JSON.parse(readFileSync(HELP_TOPICS_FILE, "utf-8"));
      data.forEach((topic: HelpTopic) => this.helpTopics.set(topic.id, topic));
    }

    // Load basics
    if (existsSync(BASICS_FILE)) {
      const data = JSON.parse(readFileSync(BASICS_FILE, "utf-8"));
      data.forEach((instruction: BasicsInstruction) => this.basicsInstructions.set(instruction.id, instruction));
    }

    // Load websites
    if (existsSync(WEBSITES_FILE)) {
      const data = JSON.parse(readFileSync(WEBSITES_FILE, "utf-8"));
      data.forEach((website: Website) => this.websites.set(website.id, website));
    }

    // Load feedback
    if (existsSync(FEEDBACK_FILE)) {
      const data = JSON.parse(readFileSync(FEEDBACK_FILE, "utf-8"));
      data.forEach((item: Feedback) => this.feedback.set(item.id, item));
    }

    // Load notifications
    if (existsSync(NOTIFICATIONS_FILE)) {
      const data = JSON.parse(readFileSync(NOTIFICATIONS_FILE, "utf-8"));
      data.forEach((notification: Notification) => this.notifications.set(notification.id, notification));
    }

    // Load chat messages
    if (existsSync(CHAT_MESSAGES_FILE)) {
      const data = JSON.parse(readFileSync(CHAT_MESSAGES_FILE, "utf-8"));
      data.forEach((message: ChatMessage) => this.chatMessages.set(message.id, message));
    }
  }

  private saveHelpTopics() {
    writeFileSync(HELP_TOPICS_FILE, JSON.stringify(Array.from(this.helpTopics.values()), null, 2));
  }

  private saveBasicsInstructions() {
    writeFileSync(BASICS_FILE, JSON.stringify(Array.from(this.basicsInstructions.values()), null, 2));
  }

  private saveWebsites() {
    writeFileSync(WEBSITES_FILE, JSON.stringify(Array.from(this.websites.values()), null, 2));
  }

  private saveFeedback() {
    writeFileSync(FEEDBACK_FILE, JSON.stringify(Array.from(this.feedback.values()), null, 2));
  }

  private saveNotifications() {
    writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(Array.from(this.notifications.values()), null, 2));
  }

  private saveChatMessages() {
    writeFileSync(CHAT_MESSAGES_FILE, JSON.stringify(Array.from(this.chatMessages.values()), null, 2));
  }

  // Help Topics
  async getAllHelpTopics(): Promise<HelpTopic[]> {
    return Array.from(this.helpTopics.values());
  }

  async getHelpTopic(id: string): Promise<HelpTopic | undefined> {
    return this.helpTopics.get(id);
  }

  async createHelpTopic(insertTopic: InsertHelpTopic): Promise<HelpTopic> {
    const id = randomUUID();
    const topic: HelpTopic = {
      ...insertTopic,
      id,
      createdAt: new Date(),
    };
    this.helpTopics.set(id, topic);
    this.saveHelpTopics();
    return topic;
  }

  async deleteHelpTopic(id: string): Promise<boolean> {
    const result = this.helpTopics.delete(id);
    if (result) {
      this.saveHelpTopics();
    }
    return result;
  }

  // Basics Instructions
  async getAllBasicsInstructions(): Promise<BasicsInstruction[]> {
    return Array.from(this.basicsInstructions.values());
  }

  async getBasicsInstruction(id: string): Promise<BasicsInstruction | undefined> {
    return this.basicsInstructions.get(id);
  }

  async createBasicsInstruction(insertInstruction: InsertBasicsInstruction): Promise<BasicsInstruction> {
    const id = randomUUID();
    const instruction: BasicsInstruction = {
      ...insertInstruction,
      id,
      favicon: insertInstruction.favicon ?? null,
      createdAt: new Date(),
    };
    this.basicsInstructions.set(id, instruction);
    this.saveBasicsInstructions();
    return instruction;
  }

  async deleteBasicsInstruction(id: string): Promise<boolean> {
    const result = this.basicsInstructions.delete(id);
    if (result) {
      this.saveBasicsInstructions();
    }
    return result;
  }

  // Websites
  async getAllWebsites(): Promise<Website[]> {
    return Array.from(this.websites.values());
  }

  async getWebsite(id: string): Promise<Website | undefined> {
    return this.websites.get(id);
  }

  async createWebsite(insertWebsite: InsertWebsite): Promise<Website> {
    const id = randomUUID();
    const website: Website = {
      ...insertWebsite,
      id,
      image: insertWebsite.image ?? null,
      createdAt: new Date(),
    };
    this.websites.set(id, website);
    this.saveWebsites();
    return website;
  }

  async deleteWebsite(id: string): Promise<boolean> {
    const result = this.websites.delete(id);
    if (result) {
      this.saveWebsites();
    }
    return result;
  }

  // Feedback
  async getAllFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedback.values());
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = randomUUID();
    const feedbackItem: Feedback = {
      ...insertFeedback,
      id,
      createdAt: new Date(),
    };
    this.feedback.set(id, feedbackItem);
    this.saveFeedback();
    return feedbackItem;
  }

  // Notifications
  async getAllNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = {
      ...insertNotification,
      id,
      isRead: insertNotification.isRead ?? false,
      createdAt: new Date(),
    };
    this.notifications.set(id, notification);
    this.saveNotifications();
    return notification;
  }

  async markNotificationAsRead(id: string): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.isRead = true;
      this.notifications.set(id, notification);
      this.saveNotifications();
      return true;
    }
    return false;
  }

  // Chat Messages
  async getAllChatMessages(): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).sort((a, b) => 
      new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
    );
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    this.saveChatMessages();
    return message;
  }
}

export const storage = new MemStorage();
