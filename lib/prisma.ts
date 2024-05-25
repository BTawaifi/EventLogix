import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
  private static instance: PrismaClient | null = null;
  private static reconnectAttempts = 0;
  private static maxReconnectAttempts = 5;
  private static reconnectDelay = 1000;

  private constructor() {}

  static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
      PrismaSingleton.setupPrisma();
    }
    return PrismaSingleton.instance;
  }

  private static setupPrisma() {
    process.on('beforeExit', async () => {
      await PrismaSingleton.teardown();
    });

    PrismaSingleton.instance!.$connect().catch(async (error) => {
      await PrismaSingleton.reconnect();
    });
  }

  private static async reconnect() {
    if (
      PrismaSingleton.reconnectAttempts < PrismaSingleton.maxReconnectAttempts
    ) {
      PrismaSingleton.reconnectAttempts++;
      setTimeout(async () => {
        try {
          await PrismaSingleton.instance!.$connect();
          PrismaSingleton.reconnectAttempts = 0;
        } catch (error) {
          await PrismaSingleton.reconnect();
        }
      }, PrismaSingleton.reconnectDelay);
    } else {
      throw new Error('Max reconnect attempts reached.');
    }
  }

  static async teardown() {
    if (PrismaSingleton.instance) {
      await PrismaSingleton.instance.$disconnect();
      PrismaSingleton.instance = null;
    }
  }
}

const prisma = PrismaSingleton.getInstance();

export default prisma;
