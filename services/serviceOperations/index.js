import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); 

export async function getAllData(tableName) {
    try {
      const data = await prisma[tableName].findMany();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }

export async function createNewData(tableName, newData) {
    try {
      const data = await prisma[tableName].create({ data: newData });
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }

  // UPDATE
export async function updateDataByAny(tableName, where, newData) {
  try {
    const data = await prisma[tableName].update({
      where: {id : where},
      data: {completed : newData},
    });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

//DELETE
export async function deleteDataByAny(tableName, where) {
  try {
    const data = await prisma[tableName].delete({ where: {id : where} });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

  