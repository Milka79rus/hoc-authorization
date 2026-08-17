# HOC для контроля доступа

Учебный проект на React + TypeScript, реализующий Higher-Order Component `withAuthorization` для ограничения доступа к компонентам на основе ролей пользователя — без использования React Context API.

## Стек

- React
- TypeScript
- Vite
- Vitest + Testing Library (для unit-тестов)

## Задача

Реализовать HOC `withAuthorization(WrappedComponent, allowedRoles)`, который:
- Проверяет, есть ли у `currentUser` (передаётся через пропсы) хотя бы одна роль из `allowedRoles`
- При наличии доступа — рендерит `WrappedComponent` со всеми исходными пропсами
- При отсутствии доступа (или отсутствии `currentUser`) — рендерит заглушку `AccessDenied`

## Архитектура

### `withAuthorization` (src/hoc/withAuthorization.tsx)

Функциональный HOC без внутреннего состояния и побочных эффектов. Данные о пользователе приходят строго через пропсы.

### `AccessDenied` (src/components/AccessDenied.tsx)

Переиспользуемый компонент-заглушка с сообщением об отказе в доступе.

### `AdminPanel` (src/components/AdminPanel.tsx)

Пример компонента, защищённого через `withAuthorization`.

### `App` (src/App.tsx)

Демонстрационная страница с переключателем пользователей (`admin`, `user`, `guest`) для наглядной проверки всех сценариев доступа.

## Типы

\`\`\`ts
// src/types.ts
export interface CurrentUser {
  roles: string[];
}
\`\`\`

## Запуск проекта

\`\`\`bash
npm install
npm run dev
\`\`\`

Приложение будет доступно на [http://localhost:5173](http://localhost:5173)

## Тесты

\`\`\`bash
npm run test
\`\`\`

Покрыты сценарии:
- Доступ разрешён (роль есть в списке)
- Доступ запрещён (роли нет в списке)
- `currentUser` отсутствует


