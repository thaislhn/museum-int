import { createClient } from "@supabase/supabase-js";

class Home {
  constructor() {
    this.initSupabase();
    this.testSupabase(); 
    this.initForm();     
  }

  initSupabase() {
    this.supabase = createClient(
      "https://axgmsjwgvbtswgjwaxoy.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4Z21zandndmJ0c3dnandheG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMzk4NjcsImV4cCI6MjA4MTYxNTg2N30.e8ptGab40GIfW5MYV-4NTGo1xyHuONG5Mf4AbiD78kg"
    );
  }

  async testSupabase() {
    const { data, error } = await this.supabase
      .from("museum_vinyl")
      .select();

    if (error) {
      console.error("error :", error);
    } else {
      this.displayData(data);
    }
  }

  initForm() {
    const form = document.querySelector("#add-work-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); 


      const titreValue = document.querySelector("#name").value;
      const artisteValue = document.querySelector("#artist").value;
      const genreValue = document.querySelector("#author").value;
      const imgValue = document.querySelector("#image_url").value;
      
      console.log("Envoi en cours...");

      // 2. Envoi à Supabase (vérifie bien que tes colonnes s'appellent ainsi)
      const { data, error } = await this.supabase
        .from("museum_vinyl")
        .insert([
          { 
            titre: titreValue, 
            artiste: artisteValue,
            genre: genreValue,
            image_url: imgValue
          }
        ])
        .select();

      if (error) {
        console.error("Erreur d'insertion :", error.message);
        alert("Erreur lors de l'ajout : " + error.message);
      } else {
        console.log("✅ Ajouté avec succès !");
        form.reset(); // Vide les champs
        this.testSupabase(); // Rafraîchit la grille 3x3
      }
    });
  }

  displayData(dataArray) {
    const gridContainer = document.querySelector("#cards");
    if (!gridContainer) return;
    
    gridContainer.innerHTML = ""; 
    
    dataArray.forEach((vinyl) => {
      const container = document.createElement("div");
      

      container.style.border = "1px solid #ddd";
      container.style.padding = "15px";
      container.style.borderRadius = "8px";
      container.style.textAlign = "center";
      container.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
      container.style.backgroundColor = "white";

    
      const img = document.createElement("img");
      img.src = vinyl.image_url || "https://via.placeholder.com/200";
      img.style.width = "100%";
      img.style.height = "200px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "4px";
      container.appendChild(img);
  
      const title = document.createElement("h2");
      title.style.fontSize = "1.1rem";
      title.style.margin = "10px 0";
      title.textContent = vinyl.titre || "Sans titre";

      const artist = document.createElement("p");
      artist.style.color = "#555";
      artist.textContent = vinyl.artiste || "Artiste inconnu";
      
      container.appendChild(title);
      container.appendChild(artist);
      
      gridContainer.appendChild(container);
    });
  }
}

new Home();