<template>
  <div class="testimoni__list">
    <mdb-row>
      <mdb-col
        v-if="listIndex <= lists.length"
        v-for="listIndex in listToShow"
        col="6"
        md="6"
        :key="lists[listIndex - 1].id"
        class="col__testimoni"
      >
        <mdb-card class="card__testimoni-content">
          <mdb-container class="mt-4">
            <!-- <small>
							{{lists[listIndex-1].id}}
						</small> -->
            <blockquote class="post__quote">
              <mdb-icon icon="quote-left" /><br />
              <span class="quote__txt">
                {{ lists[listIndex - 1].testimoni }}
              </span>
              <p class="profile__name">
                {{
                  lists[listIndex - 1].konsumen
                    ? lists[listIndex - 1].konsumen
                    : "RSI Sultan Agung Visitor"
                }}
              </p>
            </blockquote>
          </mdb-container>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
export default {
  props: ["lists", "listToShow"],
};
</script>
