import { useEffect, useMemo, useRef, useState } from 'react'
import { SortBy, User } from './interface/user.interface'
import TableUser from './components/TableUser';
import "./App.css"

function App() {
  const [users, setUsers] = useState<Array<User>>([])
  const initialStateUser = useRef<Array<User>>([])

  const [showColors, setShowColors] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)

  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  useEffect(()=>{
    fetch("https://randomuser.me/api?results=100")
    .then(async res=>await res.json())
    .then(res=>{
      setUsers(res.results)
      initialStateUser.current = res.results
    }).catch(err=>{
      console.error(err)
    })
  }, [])

  const toggleColors = () => { setShowColors(!showColors) }
  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE

    setSorting(newSortingValue)
  }

  const handleRemoveUser = (email: string) => {
    setUsers(users.filter(item => item.email !== email))
  }

  const handleResetUsers = () => {
    setUsers(initialStateUser.current)
  }

  const filterUsers = useMemo(()=>(
    typeof filterCountry === "string" ? users.filter(
      user => (
        user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      )
    ) : users
  ), [users, filterCountry])

  const sortedUsers = useMemo(()=>{

    if (sorting === SortBy.NONE) { return filterUsers }

    const compareProperties: Record<string, (user: User) => any >= {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filterUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })

  }, [filterUsers, sorting])

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  return (
    <div>
      <header className="mb-5">
        <button onClick={toggleColors}>Show Colors Table</button>
        <button onClick={toggleSortByCountry}>
          {sorting !== SortBy.COUNTRY ? "No Ordenar por pais" : "Ordenar por pais"}
        </button>
        <button onClick={handleResetUsers} disabled={users === initialStateUser.current} className={users === initialStateUser.current ? "bg-gray-200" : "bg-white"}>Reset Users</button>

        <input type="text" placeholder='Filtra por paìs' onChange={(e): void=>{setFilterCountry(e.target.value)}} />
      </header>
      <TableUser changeSorting={handleChangeSort} users={sortedUsers} showColors={showColors} handleRemoveUser={handleRemoveUser}/>
    </div>
  )
}

export default App
