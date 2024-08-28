import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plane, Train, Bus, Clock, MapPin } from "lucide-react"

// Mock data for search results
const mockResults = [
  { id: 1, type: 'flight', from: 'New York', to: 'London', departure: '2023-07-01 08:00', arrival: '2023-07-01 20:00', price: 500 },
  { id: 2, type: 'train', from: 'Paris', to: 'Berlin', departure: '2023-07-02 09:30', arrival: '2023-07-02 15:45', price: 120 },
  { id: 3, type: 'bus', from: 'Amsterdam', to: 'Brussels', departure: '2023-07-03 10:15', arrival: '2023-07-03 13:30', price: 40 },
]

export default function Component() {
  const [transportMode, setTransportMode] = useState('flight')
  const [tripType, setTripType] = useState('oneWay')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [showResults, setShowResults] = useState(false)
  const [selectedResult, setSelectedResult] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    // Here you would typically handle the search logic
    console.log('Search with:', { transportMode, tripType, departureDate, returnDate, passengers })
    setShowResults(true)
  }

  const handleResultClick = (result) => {
    setSelectedResult(result)
    console.log('Selected result:', result)
    // Here you would typically handle the booking process or show more details
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Search for Travel</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label>Mode of Transport</Label>
              <Select value={transportMode} onValueChange={setTransportMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transport mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flight"><Plane className="mr-2 h-4 w-4 inline-block" />Flight</SelectItem>
                  <SelectItem value="train"><Train className="mr-2 h-4 w-4 inline-block" />Train</SelectItem>
                  <SelectItem value="bus"><Bus className="mr-2 h-4 w-4 inline-block" />Bus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Trip Type</Label>
              <RadioGroup 
                value={tripType} 
                onValueChange={setTripType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oneWay" id="oneWay" />
                  <Label htmlFor="oneWay">One-Way</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="roundTrip" 
                    id="roundTrip" 
                    disabled={transportMode === 'train'}
                  />
                  <Label htmlFor="roundTrip" className={transportMode === 'train' ? 'text-muted-foreground' : ''}>
                    Round Trip
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departureDate">Departure Date</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    type="date" 
                    id="departureDate"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    min={today}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              {tripType === 'roundTrip' && (
                <div className="space-y-2">
                  <Label htmlFor="returnDate">Return Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      type="date" 
                      id="returnDate"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={departureDate || today}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passengers">Number of Passengers</Label>
              <Input 
                type="number" 
                id="passengers"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                min="1"
                max="10"
                required
              />
            </div>

            <Button type="submit" className="w-full">Search</Button>
          </form>
        </CardContent>
      </Card>

      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockResults.map((result) => (
                <Card 
                  key={result.id} 
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => handleResultClick(result)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {result.type === 'flight' && <Plane className="h-6 w-6" />}
                        {result.type === 'train' && <Train className="h-6 w-6" />}
                        {result.type === 'bus' && <Bus className="h-6 w-6" />}
                        <div>
                          <p className="font-semibold">{result.from} to {result.to}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{result.departure} - {result.arrival}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${result.price}</p>
                        <p className="text-sm text-muted-foreground">per person</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setShowResults(false)} variant="outline" className="w-full">
              Back to Search
            </Button>
          </CardFooter>
        </Card>
      )}

      {selectedResult && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Selected Travel Option</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You have selected a {selectedResult.type} from {selectedResult.from} to {selectedResult.to}.</p>
            <p>Departure: {selectedResult.departure}</p>
            <p>Arrival: {selectedResult.arrival}</p>
            <p>Price: ${selectedResult.price} per person</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setSelectedResult(null)} variant="outline" className="w-full">
              Close
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}