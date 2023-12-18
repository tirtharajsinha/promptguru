import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const searchedUser = await User.findById(params.id);
        if (!searchedUser) {
            return new Response("No such user found", { status: 400 });
        }

        return new Response(JSON.stringify(searchedUser), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch user", { status: 500 });
    }
} 