import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
// Each route can define a "loader" function to provide data to the route element before it renders.

import { updateContact } from "../contacts";

//add an action to the edit module
export async function action({request, params}) {

    const formData = await request.formData(); // The form data is extracted using request.formData().
    const updates = Object.fromEntries(formData); // The fromEntries method converts the form data into an object.
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`)

}

export default function Edit() {
    const contact = useLoaderData();
    const navigate = useNavigate();

    return (

        <Form method="post" id='contact-form'>
            <p>
                <span>Name</span>
                <input
                    type="text"
                    placeholder="First"
                    aria-label="First name"
                    name="first"
                    defaultValue={contact?.first}
                />
                <input
                    placeholder="Last"
                    aria-label="Last name"
                    type="text"
                    name="last"
                    defaultValue={contact?.last} />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    type="text"
                    name="twitter"
                    placeholder="@jack"
                    defaultValue={contact?.twitter}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={contact?.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={contact?.notes} // defaultValue is for the first render
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </p>
        </Form>
    );
}