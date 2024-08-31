import { Outlet, Link, useLoaderData, Form } from "react-router-dom"
import { getContacts, createContact } from "../contacts"

export async function loader() {
    const contacts = await getContacts();
    return {contacts}; // return as a single-property object
}

export async function create() {
    const contact = await createContact();
    return {contact};
}



export default function Root() {
    const { contacts } = useLoaderData();
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role='search'>
                        <input
                            type="search"
                            name='q'
                            id="q"
                            placeholder="Search"
                            aria-label="Search contacts"
                        />
                        <div
                            id="search-spinner"
                            hidden={true}
                            aria-hidden="true"
                        ></div>
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                    </div>
                    <nav>
                    {contacts.length ? (
                            <ul>
                                {contacts.map((contact) => (
                                    <li key={contact.id}>
                                        <Link to={`contacts/${contact.id}`}>
                                            {contact.first || contact.last ? (
                                                <>
                                                    {contact.first} {contact.last} 
                                                </>
                                            ) : (
                                                <i>No Name</i>
                                            )}{" "}
                                            {contact.favorite && <span>★</span>}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>
                                <i>No contacts</i>
                            </p>
                        )}
                        
                    </nav>
                </div>
                <div id="detail">
                    <Outlet></Outlet>
                </div>
        </>
    )
}