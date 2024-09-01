import { Form, useLoaderData } from "react-router-dom"; 
// the Form component is used for handling form submissions in a React Router context.
import { getContact } from "../contacts";

export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    return { contact };
}

export default function Contact() {
    const { contact } = useLoaderData();
    // const contact = {
    //     first: "Your",
    //     last: "Name",
    //     avatar: "https://robohash.org/you.png?size=200x200",
    //     twitter: "your_handle",
    //     notes: 'Some notes',
    //     favorite: true,
    // }

    return (
        <div id="contact">
            <div>
                <img
                    src={contact.avatar || `https://robohash.org/${contact.id}.png?size=200x200`
                    }
                />
            </div>


            <div>
                <h1>
                    {contact.first || contact.last ? (  // conditional rendering
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No name</i>
                    )} {" "}
                    <Favorite contact={contact} /> 
                    {/* renders the Favorite component, passing the contact object as a prop.  */}
                </h1>

                {contact.twitter && (
                    <p>
                        <a target='_blank' href={`https://twitter.com/${contact.twitter}`}>
                            {contact.twitter}
                        </a>
                    </p>

                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action='edit'>
                        {/*  When the button is clicked, it submits the form to the ‘edit’ route. */}
                        <button type='submit'>Edit</button>
                    </Form>
                    <Form
                        method='POST' 
                        action="destroy" // submit the form to contact/:contactId/destroy when clicked.
                        onSubmit={(e) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ){
                                e.preventDefault();
                            }
                        }}
                    >

                        <button type='submit'>Delete</button>

                    </Form>
                </div>
            </div>
        </div>
    )
}

function Favorite({contact}) {
    const favorite=contact.favorite;
    <button
        name='favorite'
        value={favorite ? false : true}  // when clicked the value will be updated NOT toggle
        aria-label={
            favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
    >{favorite ? "★" : "☆"}</button>
}

// The first button is primarily for form submission, while the second for toggling a favorite state.