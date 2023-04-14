using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Land_Vision.Migrations
{
    /// <inheritdoc />
    public partial class add_waard_relationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WardId",
                table: "Properties",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Properties_WardId",
                table: "Properties",
                column: "WardId");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Wards_WardId",
                table: "Properties",
                column: "WardId",
                principalTable: "Wards",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Wards_WardId",
                table: "Properties");

            migrationBuilder.DropIndex(
                name: "IX_Properties_WardId",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "WardId",
                table: "Properties");
        }
    }
}
