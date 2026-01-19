import prisma from './lib/prisma';

async function checkConnection() {
  console.log("🚀 Intentando conectar a AWS RDS...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Conexión exitosa");
  } catch (error) {
    console.error("Error de conexión:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();