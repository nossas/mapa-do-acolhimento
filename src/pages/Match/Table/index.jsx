import React, { useMemo, useCallback } from 'react'
import 'react-table/react-table.css'
import ReactTable from 'react-table'
import { useStateLink } from '@hookstate/core'
import * as turf from '@turf/turf'
import { Flexbox2 as Flexbox, Title } from 'bonde-styleguide'

import GlobalContext from 'context'
import { PointUser } from 'context/table'
import { FullWidth, Spacing } from './style'
import columns from './columns'

const Table = () => {
  const {
    matchTable: { volunteerRef, submittedParamsRef },
    table: { tableDataRef }
  } = GlobalContext

  const volunteer = useStateLink(volunteerRef)
  const submittedParams = useStateLink(submittedParamsRef)
  // table data from header, geobonde table - maybe do something universal
  const tableData = useStateLink(tableDataRef)

  const { latitude, longitude, name } = volunteer.value
  // aqui onde pode setar distancia variavel depois
  const distance = 20
  const lat = Number(latitude)
  const lng = Number(longitude)
  const filterByDistance = useCallback((data) =>
    data
      .map((i) => {
        const pointA = [Number(i.latitude), Number(i.longitude)]
        return {
          ...i,
          distance: (
            !Number.isNaN(pointA[0])
            && !Number.isNaN(pointA[1])
            && lat
            && lng
            && Number(turf.distance([lat, lng], pointA)).toFixed(2)
          ),
        }
      })
      .filter((i) => {
        if (!lat || !lng) return true
        return i.distance && Number(i.distance) < distance
      })
      .sort((a, b) => Number(a.distance) - Number(b.distance)), [distance, lat, lng])

  const filterByCategory = data => {
    return data
      .filter((i) => {
        const zendeskOrganizations = JSON.parse(process.env.REACT_APP_ZENDESK_ORGANIZATIONS)
        if (i.organization_id === zendeskOrganizations.individual) return true
        return false
    })
  }

  const filteredTableData = useMemo(() => {
    const data = filterByCategory(
      filterByDistance(
        tableData.get(),
      ),
    )
    return data
  }, [filterByCategory, filterByDistance, tableData])

  return filteredTableData.length === 0 ? (
    <FullWidth>
      <Flexbox>
        <Title.H3 margin={{ bottom: 30 }}>
          Nenhum resultado.
        </Title.H3>
      </Flexbox>
    </FullWidth>
  ) : (
    <FullWidth>
      <Flexbox vertical>
        <Spacing margin="10">
          <Title.H3>Match realizado!</Title.H3>
        </Spacing>
        <Spacing margin="25">
          <Title.H5 color="#444444">
            {`${filteredTableData.length} solicitações de MSRs próximas de ${name}`}
          </Title.H5>
        </Spacing>
        <ReactTable
          data={filteredTableData}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </Flexbox>
    </FullWidth>
  )
}

export default Table
