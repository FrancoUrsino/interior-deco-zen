import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const ordersFile = path.resolve(process.cwd(), 'orders.json');

async function readOrders() {
  try {
    const data = await fs.readFile(ordersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveOrders(orders) {
  await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));
}

export async function GET() {
  try {
    const orders = await readOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener órdenes' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const orderData = await req.json();
    const orders = await readOrders();
    const existingOrder = orders.find(order => order.merchantOrderId === orderData.merchantOrderId);

    if (existingOrder) {
      return NextResponse.json({ message: 'La orden ya existe' });
    }

    let total = orderData.total;
    if (!total || total === 0) {
      const previousOrder = orders.find(order => order.items.some(item => item.id === orderData.items[0].id));
      total = previousOrder ? previousOrder.total : orderData.items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
    }

    const newOrder = {
      ...orderData,
      total,
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    await saveOrders(orders);
    return NextResponse.json(newOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar la orden' }, { status: 500 });
  }
}
