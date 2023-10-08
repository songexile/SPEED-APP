import { UserTableProps } from '@/types/index'

const UserTable: React.FC<UserTableProps> = ({ users, onDelete, userRole }) => {
  return (
    <div className="overflow-x-auto container">
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            {userRole === 'admin' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              {userRole === 'admin' && (
                <td>
                  <button onClick={() => onDelete && onDelete(user._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
