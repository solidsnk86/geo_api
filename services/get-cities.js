const getAllCitiesAR = async () => {
  const resposne = await fetch(
    'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/geodata-arg.json'
  )
  const jsonData = await resposne.json()
  const formatJSON = Object.keys(jsonData).map((key) => {
    const { id, nombre, tipo, departamento, provincia, pais, lat, lon } =
      jsonData[key]
    return {
      id,
      nombre,
      tipo,
      departamento,
      provincia,
      pais,
      lat,
      lon,
    }
  })
  return formatJSON
}

export { getAllCitiesAR }
