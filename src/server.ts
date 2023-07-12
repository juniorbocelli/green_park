import dotenv from 'dotenv';

if (typeof process.env.NODE_ENV !== "undefined")
  dotenv.config({ path: `${process.env.NODE_ENV}.env` });
else
  dotenv.config({ path: `.env` });

import app from './app';
import DatabaseBuilder from './persistence/utils/DatabaseBuilder';

const builder = async () => {
  const data = new DatabaseBuilder();

  try {
    await data.createIfNotExist();
  } catch (error: any) {
    throw new Error(error as string);
  };
};

builder();

app.listen(process.env.SERVER_PORT, () => console.log(`Node.js Server running on port ${process.env.SERVER_PORT}`));