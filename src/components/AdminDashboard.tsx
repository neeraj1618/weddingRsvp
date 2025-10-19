import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Users, UserCheck, UserX, Loader2, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface RSVP {
  _id: string;
  guestName: string;
  phoneNumber: string;
  attendance: string;
  guestOption: string;
  guestNames: string;
  dietaryRestrictions: string;
  message: string;
  submittedAt: string;
  updatedAt: string;
}

interface Stats {
  totalRsvps: number;
  attending: number;
  notAttending: number;
  totalGuests: number;
  responseRate: number;
}

export function AdminDashboard() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch RSVPs
      const rsvpResponse = await fetch('/api/rsvps');
      const rsvpData = await rsvpResponse.json();
      
      if (rsvpResponse.ok) {
        setRsvps(rsvpData.rsvps || []);
      } else {
        throw new Error(rsvpData.error || 'Failed to fetch RSVPs');
      }

      // Fetch stats
      const statsResponse = await fetch('/api/stats');
      const statsData = await statsResponse.json();
      
      if (statsResponse.ok) {
        setStats(statsData.stats);
      } else {
        throw new Error(statsData.error || 'Failed to fetch stats');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getGuestCount = (guestOption: string): string => {
    switch (guestOption) {
      case 'just-me': return '1';
      case 'plus-one': return '2';
      case 'plus-two': return '3';
      case 'plus-three': return '4';
      case 'family': return '5+';
      default: return '1';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif text-gray-800 mb-2">RSVP Dashboard</h1>
            <p className="text-gray-600">Monalisa & Neeraj's Wedding - November 23rd, 2025</p>
          </div>
          <Button 
            onClick={fetchData}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Total RSVPs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="w-8 h-8 text-blue-500" />
                  <span className="text-3xl">{stats.totalRsvps}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Attending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-8 h-8 text-green-500" />
                  <span className="text-3xl">{stats.attending}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Not Attending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <UserX className="w-8 h-8 text-red-500" />
                  <span className="text-3xl">{stats.notAttending}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Total Guests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="w-8 h-8 text-purple-500" />
                  <span className="text-3xl">{stats.totalGuests}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* RSVPs Table */}
        <Card>
          <CardHeader>
            <CardTitle>All RSVPs</CardTitle>
            <CardDescription>
              {rsvps.length} response{rsvps.length !== 1 ? 's' : ''} received
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Guest Names</TableHead>
                    <TableHead>Dietary</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rsvps.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-500">
                        No RSVPs yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    rsvps.map((rsvp) => (
                      <TableRow key={rsvp._id}>
                        <TableCell>{rsvp.guestName}</TableCell>
                        <TableCell>{rsvp.phoneNumber}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={rsvp.attendance === 'yes' ? 'default' : 'secondary'}
                            className={rsvp.attendance === 'yes' ? 'bg-green-500' : 'bg-gray-500'}
                          >
                            {rsvp.attendance === 'yes' ? 'Attending' : 'Not Attending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {rsvp.attendance === 'yes' ? getGuestCount(rsvp.guestOption) : '-'}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {rsvp.guestNames || '-'}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {rsvp.dietaryRestrictions || '-'}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {rsvp.message || '-'}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(rsvp.submittedAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
