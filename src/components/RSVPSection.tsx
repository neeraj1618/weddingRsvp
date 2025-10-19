import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface RSVPFormData {
  guestName: string;
  phoneNumber: string;
  attendance: string;
  guestOption: string;
  guestNames: string;
  dietaryRestrictions: string;
  message: string;
}

export function RSVPSection() {
  const [formData, setFormData] = useState<RSVPFormData>({
    guestName: '',
    phoneNumber: '',
    attendance: '',
    guestOption: 'just-me',
    guestNames: '',
    dietaryRestrictions: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (field: keyof RSVPFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Using the MongoDB backend API
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(result.message || 'Thank you for your RSVP! We can\'t wait to celebrate with you.');
        // Reset form
        setFormData({
          guestName: '',
          phoneNumber: '',
          attendance: '',
          guestOption: 'just-me',
          guestNames: '',
          dietaryRestrictions: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.error || 'Failed to submit RSVP');
      }
    } catch (error) {
      console.error('RSVP submission error:', error);
      setSubmitStatus('error');
      setStatusMessage('Unable to submit RSVP. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4" id="rsvp">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" fill="currentColor" />
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            RSVP
          </h2>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">We Hope You Can Join Us!</CardTitle>
            <CardDescription className="text-center">
              Please respond by October 15th, 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitStatus === 'success' && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {statusMessage}
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === 'error' && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {statusMessage}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guestName">Full Name *</Label>
                  <Input
                    id="guestName"
                    value={formData.guestName}
                    onChange={(e) => handleInputChange('guestName', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Your phone number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Will you be attending? *</Label>
                <RadioGroup
                  value={formData.attendance}
                  onValueChange={(value) => handleInputChange('attendance', value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes, I'll be there! ✨</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">Sorry, I can't make it 😔</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.attendance === 'yes' && (
                <>
                  <div className="space-y-3">
                    <Label>Who will be attending?</Label>
                    <RadioGroup
                      value={formData.guestOption}
                      onValueChange={(value) => handleInputChange('guestOption', value)}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="just-me" id="just-me" />
                        <Label htmlFor="just-me">Just me (1 person)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="plus-one" id="plus-one" />
                        <Label htmlFor="plus-one">I'm bringing +1 (2 people total)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="plus-two" id="plus-two" />
                        <Label htmlFor="plus-two">I'm bringing +2 (3 people total)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="plus-three" id="plus-three" />
                        <Label htmlFor="plus-three">I'm bringing +3 (4 people total)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="family" id="family" />
                        <Label htmlFor="family">Family/Group (5+ people)</Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-gray-600 mt-2">
                      Please include dietary restrictions for all guests in the section below
                    </p>
                  </div>

                  {(formData.guestOption !== 'just-me') && (
                    <div className="space-y-2">
                      <Label htmlFor="guestNames">+1's Names</Label>
                      <Input
                        id="guestNames"
                        value={formData.guestNames}
                        onChange={(e) => handleInputChange('guestNames', e.target.value)}
                        placeholder="Names of your additional guests (e.g., John Smith, Jane Doe)"
                      />
                      <p className="text-sm text-gray-500">
                        Please provide the names of your additional guests
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                    <Input
                      id="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                      placeholder="Any allergies or dietary needs?"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="message">Message for the Couple</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Share your excitement or well wishes..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 text-lg"
                disabled={isSubmitting || !formData.guestName || !formData.phoneNumber || !formData.attendance}
              >
                {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Questions? Contact us at{' '}
            <a href="mailto:wedding@monalisaneeraj.com" className="text-rose-600 hover:underline">
              wedding@monalisaneeraj.com
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}