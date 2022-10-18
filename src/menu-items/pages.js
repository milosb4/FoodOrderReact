// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Stranice',
    // caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Upravljanje hranom',
            type: 'item',
            url: '/ordermanagement',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default pages;
