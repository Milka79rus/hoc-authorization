import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { withAuthorization } from './withAuthorization';

function Secret() {
    return <div>Секретный контент</div>;
}

const ProtectedSecret = withAuthorization(Secret, ['admin']);

describe('withAuthorization', () => {
    it('показывает компонент, если роль разрешена', () => {
        render(<ProtectedSecret currentUser={{ roles: ['admin'] }} />);
        expect(screen.getByText('Секретный контент')).toBeInTheDocument();
    });

    it('показывает заглушку, если роли нет в списке разрешённых', () => {
        render(<ProtectedSecret currentUser={{ roles: ['user'] }} />);
        expect(
            screen.getByText('У вас нет прав для просмотра этого раздела.'),
        ).toBeInTheDocument();
    });

    it('показывает заглушку, если currentUser отсутствует', () => {
        render(<ProtectedSecret />);
        expect(
            screen.getByText('У вас нет прав для просмотра этого раздела.'),
        ).toBeInTheDocument();
    });
});