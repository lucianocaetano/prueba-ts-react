import React from "react"
import {SortBy, User} from "../interface/user.interface"

type PropsType = {
  users: Array<User>,
  showColors: boolean,
  handleRemoveUser: (email: string) => void,
  changeSorting: (sort: SortBy) => void
}

const TableUser: React.FC<PropsType> = ({users, showColors, handleRemoveUser, changeSorting}) => {

  return (
    <table width="100%">
      <thead>
        <tr>
          <td>id</td>
          <td className="pointer" onClick={()=>changeSorting(SortBy.NAME)}>First Name</td>
          <td className="pointer" onClick={()=>changeSorting(SortBy.LAST)}>Last</td>
          <td className="pointer" onClick={()=>changeSorting(SortBy.COUNTRY)}>Country</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody >
        {
          users&&users.map((item: User, index: number) => (
            <tr key={index} className={showColors? index % 2 !== 0 ? "bg-gray-400" : "bg-gray-100":"bg-white"}>
              <td>{item.id.value}</td>

              <td>{item.name.first}</td>
              <td>{item.name.last}</td>
              <td>{item.location.country}</td>
              <td>
                <button className="p-2 bg-gray-700 text-white" onClick={
                  ()=>handleRemoveUser(item.email)
                }>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </td>
            </tr>

          ))
        }
      </tbody>
    </table>
  )
}

export default TableUser
