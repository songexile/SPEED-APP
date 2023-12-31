import { UserTableProps } from '@/types/index'
import Skeleton from 'react-loading-skeleton'

const UserTable: React.FC<UserTableProps> = ({ users, onDelete, userRole, isLoading }) => {
  return (
    <div className="overflow-x-auto">
      <>
        {isLoading ? (
          <Skeleton count={6} baseColor="#202020" highlightColor="#444" />
        ) : users.length > 0 ? ( // Check if there are users in the array
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
                      <button
                        onClick={() => onDelete && onDelete(user._id)}
                        className="text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </>
    </div>
  )
}

export default UserTable
