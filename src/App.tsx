import Card from '@components/Card'
import React from 'react'

const App = () => {
  return (
    <main
      className="min-h-screen"
    >
      <Navbar />

      <Card>
      <hr className="mt-4" />

<ListContainer>
  <Todo/>
</ListContainer>
      </Card>
    </main>
  )
}

export default App