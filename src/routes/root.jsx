export default function Root() {
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
                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                    </div>
                    <nav>
                        <ul>
                            <li><a href={`/contacts/1`}>Delhi</a></li>
                            <li><a href={`/contacts/2`}>Sardar</a></li>
                        </ul>
                    </nav>
                </div>
                <div id="detail"></div>
        </>
    )
}