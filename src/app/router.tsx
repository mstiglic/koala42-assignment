import { createBrowserRouter } from 'react-router';
import DefaultLayout from '~layouts/DefaultLayout.tsx';
import HierarchyPage from '~features/hierarchy/pages/HierarchyPage.tsx';
import { ROUTES } from '~app/routes.ts';

const router = createBrowserRouter([{
    path: ROUTES.ROOT,
    Component: DefaultLayout,
    children: [{
        path: ROUTES.HIERARCHY,
        Component: HierarchyPage,
    }]
}]);

export default router;
