



export const ErrorComponent = ({ mensaje = '' }) => {

  return (
    <div class="bg-red-100 border border-red-400 text-red-400 px-4 py-3 rounded relative mb-5 text-center" role="alert">
        <strong class="font-bold">ERROR! {''}</strong>
        <span class="block sm:inline uppercase">{ mensaje }</span>
    </div>
  )

}
