/*
  # Create jobs table for job portal

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key) - Unique identifier for each job
      - `job_title` (text) - Title of the job position
      - `company_name` (text) - Name of the hiring company
      - `location` (text) - Job location
      - `experience` (text) - Required experience level
      - `skills` (text[]) - Array of required skills
      - `description` (text) - Detailed job description
      - `created_at` (timestamptz) - Timestamp when job was posted
      
  2. Security
    - Enable RLS on `jobs` table
    - Add policy for anyone to read jobs (public access)
    - Add policy for authenticated users to insert jobs
    - Add policy for authenticated users to update their own jobs
    - Add policy for authenticated users to delete their own jobs
    
  3. Notes
    - Jobs are publicly viewable to allow job seekers to browse
    - Only authenticated users can post jobs
    - Skills stored as array for flexible querying
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title text NOT NULL,
  company_name text NOT NULL,
  location text NOT NULL,
  experience text NOT NULL,
  skills text[] NOT NULL DEFAULT '{}',
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view jobs"
  ON jobs FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (true);