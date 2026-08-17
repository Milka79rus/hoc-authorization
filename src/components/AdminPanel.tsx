import type { WithAuthorizationProps } from '../hoc/withAuthorization';

interface AdminPanelProps extends WithAuthorizationProps {
    title?: string;
}

export function AdminPanel({ title = 'Админская панель', currentUser }: AdminPanelProps) {
    return (
        <div className="admin-panel">
            <h2>{title}</h2>
            <p>Добро пожаловать, у вас роли: {currentUser?.roles.join(', ')}</p>
        </div>
    );
}