import { create } from "@/actions/create-board";
const OrganizationIdPage = async () => {
	
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
