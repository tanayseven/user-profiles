import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { EditableField } from './EditableFields'

it('should be editable when a new component is created', () => {
  // given
  render(<EditableField fieldName="First Name" fieldValue="Lalu" />)
  const editButton = screen.getByText(/Edit/)

  // when
  fireEvent.click(editButton)
  const textField = screen.getByDisplayValue(/Lalu/)
  fireEvent.change(textField, { target: { value: 'Babu' } })
  const saveButton = screen.getByText(/Save/)
  fireEvent.click(saveButton)

  // then
  const newSavedText = screen.getByText(/Babu/)
  expect(newSavedText).toBeInTheDocument()
  const oldTextBeforeSaving = screen.queryByText(/Lalu/)
  expect(oldTextBeforeSaving).toBeFalsy()
})
