import React, { useState } from 'react'

interface Props {
  fieldName: string
  fieldValue: string
}

type ComponentState = 'view' | 'edit'

export const EditableField: React.FC<Props> = ({ fieldValue, fieldName }) => {
  const [componentState, setComponentState] = useState<ComponentState>('view')
  const [modifiableFieldValue, setModifiableFieldValue] = useState<string>(fieldValue)

  if (componentState === 'view')
    return (
      <p>
        {fieldName}: {modifiableFieldValue}{' '}
        <input type="button" value="Edit" onClick={() => setComponentState('edit')} />
      </p>
    )

  return (
    <p>
      {fieldName}{' '}
      <input
        type="text"
        value={modifiableFieldValue}
        onChange={(event) => setModifiableFieldValue(event.target.value)}
      />{' '}
      <input type="button" value="Save" onClick={() => setComponentState('view')} />
    </p>
  )
}
