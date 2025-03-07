import { connectDB } from '@/helper/db';
import TechnicalTeam from '../../../../models/TechnicalTeam';
import NonTechnicalTeam from '../../../../models/NonTechnicalTeam';
import EventManagementTeam from '../../../../models/EventManagement';

export async function POST(req) {
  try {
    await connectDB();

      const  {
      name,
      regNo,
      email,
      phoneNumber,
      branch,
      selectedTeam,
    } = await req.json();

    let TeamModel;
    if (selectedTeam === "Technical") {
      TeamModel = TechnicalTeam;
    } else if (selectedTeam === "Non-Technical") {
      TeamModel = NonTechnicalTeam;
    } else if (selectedTeam === "Event Management") {
      TeamModel = EventManagementTeam;
    } else {
      return new Response(JSON.stringify({ message: "Invalid team selection" }), { status: 400 });
    }

    const newEntry = new TeamModel({
      name,
      regNo,
      email,
      phoneNumber,
      branch,
      selectedTeam,
      reason: reason || null,
      contribution: contribution || null,
      github: github || null,
      linkedin: linkedin || null,
      codingProfile: codingProfile || null,
      previousWork: previousWork || null,
    });

    await newEntry.save();

    return new Response(JSON.stringify({ message: 'Form data submitted successfully!' }), { status: 201 });
  } catch (error) {
    console.error('Error saving form data:', error);
    return new Response(JSON.stringify({ message: 'Error submitting the form data.' }), { status: 500 });
  }
}
