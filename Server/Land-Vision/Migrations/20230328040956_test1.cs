using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Land_Vision.Migrations
{
    /// <inheritdoc />
    public partial class test1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Posts_PostId",
                table: "Properties");

            migrationBuilder.DropIndex(
                name: "IX_Properties_PostId",
                table: "Properties");

            migrationBuilder.AddColumn<int>(
                name: "propertyId",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_propertyId",
                table: "Posts",
                column: "propertyId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Properties_propertyId",
                table: "Posts",
                column: "propertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Properties_propertyId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_propertyId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "propertyId",
                table: "Posts");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_PostId",
                table: "Properties",
                column: "PostId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Posts_PostId",
                table: "Properties",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
