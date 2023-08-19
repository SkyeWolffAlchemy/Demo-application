import { Link, Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <>
        <nav>
            <p>
                <a href={`/Demo-application/`}>👋</a> &mdash;
                <Link to={`/Demo-application/app`}>App</Link> &mdash;
                <Link to={`/Demo-application/clock`}>Clock</Link> &mdash;
                <Link to={`/Demo-application/fetcher`}>API Fetcher</Link> &mdash;
                <Link to={`/Demo-application/equalizer`}>Equalizer</Link> &mdash;
                <Link to={`/Demo-application/names`}>Names</Link> &mdash;
                <Link to={`/Demo-application/traveloger`}>Traveloger</Link>
                </p>
        </nav>
        <hr/>
        <div>
            <Outlet />
        </div>
        </>
    );
}