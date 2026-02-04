// Script to create a GitHub repository for this project
import { getUncachableGitHubClient } from '../server/github';

async function createRepository() {
  try {
    const octokit = await getUncachableGitHubClient();
    
    // Get authenticated user info
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`Authenticated as: ${user.login}`);
    
    const repoName = 'cosmic-artifacts-portfolio';
    const repoDescription = 'Mythic Artist Portfolio - A fever dream digital art gallery with fractal-minimal design, living constellation navigation, and cosmic aesthetics';
    
    // Check if repo already exists
    try {
      const { data: existingRepo } = await octokit.repos.get({
        owner: user.login,
        repo: repoName
      });
      console.log(`\nRepository already exists!`);
      console.log(`URL: ${existingRepo.html_url}`);
      console.log(`Clone URL: ${existingRepo.clone_url}`);
      return existingRepo;
    } catch (e: any) {
      if (e.status !== 404) throw e;
      // Repo doesn't exist, create it
    }
    
    // Create the repository
    const { data: repo } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: repoDescription,
      private: false, // Set to true if you want a private repo
      auto_init: false, // Don't initialize with README since we have code
    });
    
    console.log(`\n✨ Repository created successfully!`);
    console.log(`\nRepository URL: ${repo.html_url}`);
    console.log(`Clone URL: ${repo.clone_url}`);
    console.log(`SSH URL: ${repo.ssh_url}`);
    
    console.log(`\n📋 To push your code to GitHub:`);
    console.log(`\n1. Clone this Replit project locally or download the code`);
    console.log(`2. In your local terminal, run:`);
    console.log(`   git remote add origin ${repo.clone_url}`);
    console.log(`   git push -u origin main`);
    
    return repo;
  } catch (error: any) {
    console.error('Error creating repository:', error.message);
    throw error;
  }
}

createRepository();
