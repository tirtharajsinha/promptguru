'use client'

import Form from "@components/Form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"



const page = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/api/prompt/new',
                {
                    method: "POST",
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userID: session?.user.id,
                        tag: post.tag
                    })
                })

            if (response.ok) {
                router.push('/');
                // console.log(response);
            }
        } catch (error) {
            console.log(error)

        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt} />
    )
}

export default page