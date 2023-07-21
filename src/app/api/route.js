import { NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';


const dbpath = path.join(process.cwd(), 'data.json');

async function getSavedData() {
  const fileRead = await fs.promises.readFile(dbpath, 'utf8');
  const parsedData = JSON.parse(fileRead);
  return parsedData;
}

//Get Saved Data in json Format
export async function GET() {
    return NextResponse.json(await getSavedData())
}


async function updateData(data) {
    await fs.promises.writeFile(dbpath, JSON.stringify(data, null, 2), 'utf8');
  }

  export async function POST(req) {
    const requested = await req.json();
    const existingData = await getSavedData();
  
    // Combine old data with new one
    const newData = [...existingData, requested];
  
    await updateData(newData);
  
    return NextResponse.json(newData);
  }

  //PUT Method Start Here
  
export async function PUT(req) {
    const request = await req.json()
    const addedData = await getSavedData()
    const url = parseInt(req.nextUrl.searchParams.get('id'));
    const recordToUpdate = addedData.find((record) => record.id === url);

    let recordFound = true;
    if (!recordToUpdate) {
        recordFound = false;
        console.log(recordToUpdate, "record not found")
        return NextResponse.error(404, 'Record not found');
        }
    // Merge the new data into the existing record
      Object.assign(recordToUpdate, request);
    
      // Update the record in the data array
      await updateData(addedData);
    
      return NextResponse.json(recordToUpdate);
    }

//Delete Method
export async function DELETE(req) {
    const request = await req.json()
    const addedData = await getSavedData()
    const url = parseInt(req.nextUrl.searchParams.get('id'));
    const recordToUpdate = addedData.findIndex((record) => record.id === url);

    let recordFound = true;
    if (!recordToUpdate) {
        recordFound = false;
        
        }
    addedData.splice(recordToUpdate, 1);
    await updateData(addedData);
    Object.assign(recordToUpdate, request);
      return NextResponse.json(recordToUpdate);
    }

    //Patch Method
    export async function PATCH(req) {
        const request = await req.json()
        const addedData = await getSavedData()
        const url = parseInt(req.nextUrl.searchParams.get('id'));
        const recordToUpdate = addedData.find((record) => record.id === url);
    
        let recordFound = true;
        if (!recordToUpdate) {
            recordFound = false;
          
            }
        // Merge the new data into the existing record
          Object.assign(recordToUpdate, request);
        
          // Update the record in the data array
          await updateData(addedData);
        
          return NextResponse.json(recordToUpdate);
        }
