type Role = 'admin' | 'manager' | 'author'

const hasAccess = (role: Role, requiredRole: Role) => {
  const roleHierarchy = {
    admin: 3,
    manager: 2,
    author: 1,
  }

  return roleHierarchy[role] >= roleHierarchy[requiredRole]
}

export { hasAccess }
