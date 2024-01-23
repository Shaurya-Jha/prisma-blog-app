// route file to handle get and post requests

import prisma from "@/prisma";
import { NextResponse } from "next/server";

// connection function to connect to the database
async function main() {
  try {
    // connect application to the database
    await prisma.$connect();
  } catch (error) {
    console.log(`Error\n: ${error}`);
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    // will connect app to the database
    await main();

    // find all the posts from the database
    const posts = await prisma.post.findMany();

    return NextResponse.json(
        // message
        {
            message:"Success fetching the posts from the database",
            // will carry all the fetched posts in the posts variable
            posts
        },
        // status
        {
            status: 200     // OK status
        }
    )
  } catch (error) {
    // sending error response as json
    return NextResponse.json(
      // message json
      {
        messsage: "error in the GET method\n",
        error,
      },
      // status
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
  } catch (error) {
    // sending error response as json
    return NextResponse.json(
      // message json
      {
        message: "error in the POST method\n",
        error,
      },
      // status
      {
        status: 500,
      }
    );
  }
};
