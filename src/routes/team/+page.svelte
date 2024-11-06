<script lang="ts">
    interface BoardMember {
      position: string;
      name: string;
    }
  
    const executiveBoard: BoardMember[] = [
      { position: "Board President", name: "Bill Williams" },
      { position: "Board Vice President", name: "Ryan Dragoo" },
      { position: "Board Vice President", name: "Joshua Nash" },
    ];
  
    const boardMembers: string[] = [
      "Tanner Shelton",
      "Amy Wellens",
      "Brad Stephens",
      "Mike Harshfield"
    ];
  
    const staff: BoardMember[] = [
      { position: "Golf Course Superintendent", name: "Greg Oveson" },
      { position: "Secretary/Treasurer", name: "Beth Hough" },
      { position: "Clubhouse Manager/Head Golf Professional", name: "Scott Marcum" },
    ];
  </script>
  
  <section class="w-full h-full bg-white p-8">
    <div class="max-w-md mx-auto space-y-8">
      <h2 class="text-2xl font-serif text-center">Board & Staff</h2>
      
      <!-- Executive Board -->
      <div class="space-y-3">
        <h3 class="text-lg font-medium border-b pb-1">Executive Board</h3>
        <div class="grid gap-2 ">
          {#each executiveBoard as { position, name }}
            <div class="flex justify-between items-center">
              <span class="font-medium">{name}</span>
              <span class="text-sm text-neutral-600">{position}</span>
            </div>
          {/each}
        </div>
      </div>
  
      <!-- Board Members -->
      <div class="space-y-3">
        <h3 class="text-lg font-medium border-b pb-1">Board Members</h3>
        <div class="grid gap-2 ">
          {#each boardMembers as name}
            <div class="font-medium">{name}</div>
          {/each}
        </div>
      </div>
  
      <!-- Staff -->
      <div class="space-y-3">
        <h3 class="text-lg font-medium border-b pb-1">Staff</h3>
        <div class="grid gap-2 ">
          {#each staff as { position, name }}
            <div class="flex justify-between items-center">
              <span class="font-medium">{name}</span>
              <span class="text-sm text-neutral-600">{position}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>