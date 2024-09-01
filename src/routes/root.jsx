import { Outlet, NavLink, Link, useLoaderData, Form, redirect, useNavigation } from "react-router-dom"
import { getContacts, createContact } from "../contacts"
import { useEffect } from "react";


// The request parameter in the loader function is provided by React Router DOM when the loader is called. It represents the HTTP request that triggered the loading of the route.
// Route Loading: When user navigates to a route that has a defined loader function, React Router DOM calls that function. Request Object: The loader function is passed a request object as an argument. This object contains info about the HTTP request, such as the URL, HTTP method, headers, and body.
export async function loader({ request }) {
    const url = new URL(request.url);  // create a URL object from the request.url property of the request object.

    const q = url.searchParams.get("q"); 
    const contacts = await getContacts(q);
    return {contacts, q}; // return as a single-property object
}

export async function create() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation(); // useNavigation returns the current navigation state: it can be one of "idle" | "submitting" | "loading".

    useEffect(() => {
        document.getElementById('q').value = q;
    }, [q])


    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role='search'>
                        <input
                            type="search"
                            name='q'
                            id="q"
                            placeholder="Search"
                            defaultValue={q}
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
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                    </div>
                    <nav>
                    {contacts.length ? (
                            <ul>
                                {contacts.map((contact) => (
                                    <li key={contact.id}>
                                        <NavLink 
                                            to={`contacts/${contact.id}`}
                                            className={( { isActive, isPending } ) => 
                                            isActive ? "active" : isPending ? "pending" : "" 
                                        }
                                        >
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
                                        </NavLink>
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
                <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
                    <Outlet></Outlet>
                </div>
        </>
    )
}