import type { ReactNode } from 'react';
import { Outlet } from 'react-router';

function DefaultLayout(): ReactNode {
    return (
        <div className="min-h-dvh flex">
            <Outlet />
        </div>
    );
}

export default DefaultLayout;
