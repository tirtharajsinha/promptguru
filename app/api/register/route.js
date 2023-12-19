import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from 'bcrypt';

export const POST = async (request) => {
    const { email, username, password, image } = await request.json();
    try {
        await connectToDB();

        // User exists
        const UserExists = await User.findOne({ email: email });



        // create New User
        if (!UserExists) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                email: email,
                username: username.replace(" ", "").toLowerCase(),
                password: hashedPassword,
                image: image || "/assets/icons/user.svg"
            })
            return new Response("New user Created", { status: 200 });
        }
        else {
            if (!UserExists.password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                UserExists.password = hashedPassword;
                await UserExists.save();
                return new Response(JSON.stringify(UserExists), { status: 200 });
            }
            else {
                return new Response(JSON.stringify({ "message": "User Already exists." }), { status: 500 });
            }
        }


    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}


