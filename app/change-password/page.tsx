"use client"

import { useCallback, useContext, useEffect, useState } from "react"
import { SupabaseContext } from "../SupabaseContext.js"

export default function () {
  const supabase = useContext(SupabaseContext)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [canPasswordBeChanged, setCanPasswordBeChanged] =
    useState<boolean>(false)
  const [hasPasswordBeenChanged, setHasPasswordBeenChanged] =
    useState<boolean>(false)
  const [wasThereAnError, setWasThereAnError] = useState<boolean>(false)

  useEffect(
    function () {
      supabase.auth.onAuthStateChange(async (event) => {
        console.log("event", event)
        if (event === "SIGNED_IN") {
          setCanPasswordBeChanged(true)
        }
      })
    },
    [supabase],
  )

  const onChangePassword = useCallback(async function onChangePassword(
    event: any,
  ) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const password = formData.get("password")?.toString()
    if (password) {
      setIsSubmitting(true)
      const { error } = await supabase.auth.updateUser({
        password,
      })
      setIsSubmitting(false)
      if (error) {
        setWasThereAnError(true)
        setHasPasswordBeenChanged(false)
      } else {
        setHasPasswordBeenChanged(true)
        setWasThereAnError(false)
      }
    }
  }, [])

  return (
    <div className="row h-100 align-items-center justify-content-center">
      <div className="col col-md-3">
        {hasPasswordBeenChanged ? (
          <div className="alert alert-success">
            The password has been changed.
          </div>
        ) : (
          <>
            {wasThereAnError && (
              <div className="alert alert-danger mb-2">There was an error.</div>
            )}

            <form onSubmit={onChangePassword}>
              <div className="form-floating mb-2">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  autoFocus
                />
                <label htmlFor="floatingInput">New password</label>
              </div>

              <button
                className="btn btn-primary w-100 py-2"
                type="submit"
                disabled={isSubmitting || !canPasswordBeChanged}
              >
                Change password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
