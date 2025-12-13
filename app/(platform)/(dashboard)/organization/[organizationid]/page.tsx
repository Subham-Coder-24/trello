import {db} from "@/lib/db"
const OrganizationIdPage = async () => {
	async function create(formData:FormData) {
		"use server";
    const title = formData.get("title") as string
		console.log("I am in server");

    await db.board.create({
      data:{
        title,
      }
    })
	}
	return (
		<div className="w-full mb-20">
			<form action={create}>
				<input
					id="title"
					name="title"
					required
					placeholder="please type here"
				/>
			</form>
		</div>
	);
};

export default OrganizationIdPage;
