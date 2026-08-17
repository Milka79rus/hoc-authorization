import type { ComponentType } from 'react';
import { AccessDenied } from '../components/AccessDenied';
import type { CurrentUser } from '../types';

export interface WithAuthorizationProps {
    currentUser?: CurrentUser | null;
}

/**
 * HOC, ограничивающий доступ к компоненту на основе ролей пользователя.
 *
 * @param WrappedComponent - компонент, который нужно защитить
 * @param allowedRoles - список ролей, которым разрешён доступ
 * @returns новый компонент с проверкой прав доступа
 */
export function withAuthorization<P extends WithAuthorizationProps>(
    WrappedComponent: ComponentType<P>,
    allowedRoles: string[],
) {
    function WithAuthorization(props: P) {
        const { currentUser } = props;

        // Если пользователь не передан или у него нет ролей — доступ запрещён
        const hasAccess =
            !!currentUser?.roles &&
            currentUser.roles.some((role) => allowedRoles.includes(role));

        if (!hasAccess) {
            return <AccessDenied />;
        }

        // Пробрасываем все пропсы без изменений
        return <WrappedComponent {...props} />;
    }

    const componentName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component';

    WithAuthorization.displayName = `withAuthorization(${componentName})`;

    return WithAuthorization;
}