export function getNameInitials(name: string) {
    const names = name.split(' ')
    return names
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }
  