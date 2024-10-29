'use client'

import { fetchAuthSession } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'
import * as bootstrap from 'bootstrap'
import { useCallback, useEffect, useRef, useState } from 'react'
import { generateClient } from './generateUserPoolClient.js'

const client = generateClient()

export default function () {
  const dropdownRef = useRef<HTMLAnchorElement>(null)

  useEffect(
    function () {
      if (dropdownRef.current) {
        const dropdown = new bootstrap.Dropdown(dropdownRef.current)
        return () => dropdown.dispose()
      }
    },
    [dropdownRef]
  )

  const [tenantIds, setTenantIds] = useState<string[] | null>(null)

  useEffect(function () {
    async function updateTenantIds() {
      const result = await client.queries.retrieveUserTenantIds()
      const tenantIds = result.data
      console.log('tenantIds', tenantIds)
      setTenantIds(tenantIds)
    }

    const cancel = Hub.listen('auth', updateTenantIds)

    updateTenantIds()

    return () => cancel()
  }, [])

  const [tenantId, setTenantId] = useState<string | null>(null)

  const selectTenant = useCallback(function selectTenant(tenantId: string) {
    setTenantId(tenantId)
  }, [])

  const onSelectTenant = useCallback(function onSelectTenant(
    event: any,
    tenantId: string
  ) {
    event.preventDefault()
    selectTenant(tenantId)
  },
  [])

  const onCreateTenant = useCallback(async function onCreateTenant(event: any) {
    event.preventDefault()
    const result = await client.mutations.createAndJoinTenant()
    if (result.data) {
      const tenantId = result.data
      selectTenant(tenantId)
    }
  }, [])

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          Multi-tenant
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href='/invite'>
                Invite
              </a>
            </li>
          </ul>

          <ul className='navbar-nav'>
            <li className='nav-item dropdown'>
              <a
                ref={dropdownRef}
                className='nav-link dropdown-toggle'
                href='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                {tenantId ? `Tenant ${tenantId}` : 'Select tenant'}
              </a>
              <ul className='dropdown-menu'>
                {tenantIds?.map(tenantId => (
                  <li>
                    <a
                      className='dropdown-item'
                      href='#'
                      onClick={event => onSelectTenant(event, tenantId)}
                    >
                      Tenant {tenantId}
                    </a>
                  </li>
                ))}

                {tenantIds && tenantIds.length >= 1 && (
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                )}

                <li>
                  <a
                    className='dropdown-item'
                    href='#'
                    onClick={onCreateTenant}
                  >
                    Create tenant
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
