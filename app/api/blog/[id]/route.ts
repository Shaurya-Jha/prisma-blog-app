/* file to fetch data via the dynamic id from the request */

import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { main } from "../route";

// GET request to get the value as per the dynamic id passed in the parameter
// asynchronous code for better app working
// it will not block the processess and the app will work smoothly
export const GET = async (req: Request, res: NextResponse) => {
  try {
    // this will fetch the first value passed on the url which will be the id
    const id = req.url.split("/blog/")[1];

    // connect to the database
    await main();

    const post = await prisma.post.findFirst({
      // fetching the id by using where clause
      where: {
        id,
      },
    });

    if (!post) {
      return NextResponse.json(
        // message if not found id
        {
          message: "Problem fetching the id",
        },
        // status - 404
        {
          status: 404,
        }
      );
    }
    // if found id then
    return NextResponse.json(
      // message for if found if
      {
        message: "Found id",
        post,
      },
      // status code - 200
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      // message
      {
        message: "Error fetching the data for the id",
      },
      // status
      {
        status: 500,
      }
    );
  } finally {
    // close the connection
    await prisma.$disconnect();
  }
};

// PUT request for the updation of the data on the basis of the id
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    // get id from the url
    const id = req.url.split("/blog/")[1];

    const { title, description } = await req.json();
    await main();

    const post = await prisma.post.update({
      // data to be replaced
      data: {
        title,
        description,
      },
      // where to update - in this id
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Updated successfully", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      // message
      {
        message: "Error updating the data for the id",
      },
      // status
      {
        status: 500,
      }
    );
  } finally {
    // close the connection
    await prisma.$disconnect();
  }
};

// DELETE request for the deletion of the data on the basis of the id
export const DELETE = async(req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();
    const post = await prisma.post.delete({where:{id}});

    return NextResponse.json({message:"Delete success", post},{status: 200})
  } catch (error) {
    return NextResponse.json(
      // message
      {
        message: "Error deleting the data for the id",
      },
      // status
      {
        status: 500,
      }
    );
  } finally {
    // close the connection
    await prisma.$disconnect();
  }
};
