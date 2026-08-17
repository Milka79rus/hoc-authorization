import { useState } from 'react';
import { withAuthorization } from './hoc/withAuthorization';
import { AdminPanel } from './components/AdminPanel';
import type { CurrentUser } from './types';
import './App.css';

const AdminPanelWithAuth = withAuthorization(AdminPanel, ['admin']);

const users: Record<string, CurrentUser> = {
  admin: { roles: ['admin'] },
  user: { roles: ['user'] },
  guest: { roles: [] },
};

function App() {
  const [userKey, setUserKey] = useState<keyof typeof users>('admin');

  return (
    <div className="app">
      <h1>HOC для контроля доступа</h1>

      <div className="user-switcher">
        <p>Текущий пользователь:</p>
        {Object.keys(users).map((key) => (
          <button
            key={key}
            className={key === userKey ? 'active' : ''}
            onClick={() => setUserKey(key as keyof typeof users)}
          >
            {key}
          </button>
        ))}
      </div>

      <AdminPanelWithAuth currentUser={users[userKey]} />
    </div>
  );
}

export default App;